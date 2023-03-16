import axios from 'axios';
import ServiceCaller from '../../../src/utils/service-call.utils';
import Config from '../../../src/config'

jest.mock('axios');

const mockAxios = axios as jest.MockedFunction<typeof axios>;

describe('ServiceCaller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call service and return response', async () => {
    const mockResponse = {
      data: {},
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {},
    }

    mockAxios.mockResolvedValueOnce(mockResponse);

    const serviceCaller = new ServiceCaller();

    const response = await serviceCaller.call({
      method: 'GET',
      url: '/some-endpoint',
    });

    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith({
      method: 'get',
      headers: {
        accept: 'application/json',
        'x-api-key': Config.apiKey,
      },
      url: `${Config.serviceUrl}/some-endpoint`,
      data: undefined,
      params: undefined,
    });
    expect(response).toEqual(mockResponse.data);
  });

  it('should retry and throw error if response status is 500', async () => {
    const error = new Error('Internal Server Error');
    const mockResponse = { response: { status: 500 } };
    mockAxios.mockRejectedValueOnce(mockResponse);
    mockAxios.mockRejectedValueOnce(error);

    const serviceCaller = new ServiceCaller();

    await expect(serviceCaller.call({
      method: 'GET',
      url: '/some-endpoint',
    })).rejects.toThrow(error);

    expect(mockAxios).toHaveBeenCalledTimes(2);
    expect(mockAxios).toHaveBeenCalledWith({
      method: 'get',
      headers: {
        accept: 'application/json',
        'x-api-key': Config.apiKey,
      },
      url: `${Config.serviceUrl}/some-endpoint`,
      data: undefined,
      params: undefined,
    });
  });

  it('should throw error if all retry attempts failed and response status is not 500', async () => {
    const mockError = new Error();
    jest.spyOn(axios, 'request').mockRejectedValue(mockError);

    const serviceCaller = new ServiceCaller();

    await expect(serviceCaller.call({
      method: 'GET',
      url: '/some-endpoint',
    })).rejects.toThrowError();

    expect(mockAxios).toHaveBeenCalledTimes(1);
    expect(mockAxios).toHaveBeenCalledWith({
      method: 'get',
      headers: {
        accept: 'application/json',
        'x-api-key': Config.apiKey,
      },
      url: `${Config.serviceUrl}/some-endpoint`,
      data: undefined,
      params: undefined,
    });
  });
});
