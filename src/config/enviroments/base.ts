import IConfig from '../IConfig.interface'

class BaseConfig implements IConfig {
  public retryAttemps = Number(process.env.RETRY_ATTEMPS) || 0

  public retryInterval = Number(process.env.RETRY_INTERVAL_MS) || 0

  public apiKey = process.env.KRAKEN_FLEX_API_KEY || ''

  public serviceUrl = process.env.KRAKEN_FLEX_SERVICE_URL || ''

  public specificSiteId = process.env.SPECIFIC_SITE_ID || ''

  public limitedDate = process.env.FILTERING_LIMITED_DATE || ''
}

export default BaseConfig;
