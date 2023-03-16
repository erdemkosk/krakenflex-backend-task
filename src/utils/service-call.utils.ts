import axios, { AxiosRequestConfig } from 'axios';
import * as path from 'path';
import Logger from './logger.utils';
import Config from '../config';

export default class ServiceCaller {
  async call({
    method, url, data, params,
  }: AxiosRequestConfig) {
    const options: AxiosRequestConfig = {
      method: method ? method.toLowerCase() : undefined,
      headers: {
        accept: 'application/json',
        'x-api-key': Config.apiKey,
      },
      url: new URL(path.join(Config.serviceUrl, url)).toString(),
      data,
      params,
    };

    for (let i = 0; i < Config.retryAttemps; i += 1) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const response = await axios(options);

        if (!response.data) {
          throw new Error()
        }

        return response.data;
      } catch (error) {
        if (i === Config.retryAttemps - 1 || (error.response && error.response.status) !== 500) {
          Logger.error(`Http Status ${error.response && error.response.status} - ${error.message}`);
          throw error;
        }
        Logger.error(`Http Status 500 - Retry Left ${Config.retryAttemps - i - 1}`);
        // eslint-disable-next-line no-await-in-loop, no-promise-executor-return
        await new Promise((resolve) => setTimeout(resolve, Config.retryInterval));
      }
    }
    return null;
  }
}
