const version = process.env.REACT_APP_VERSION

export class LocalSettings {
  public settings = {
    api: 'http://api.portal.xyo.network:12001' ,
    mock: false,
    network: '',
    contract: '',
    version
  }

  constructor() {
    this.load()
  }

  public getLocalStorage() {
    if (typeof(localStorage) !== 'undefined') {
      return localStorage
    }
    return null
  }

  public save() {
    const storage = this.getLocalStorage()
    if (storage) {
      storage.setItem('settings', JSON.stringify(this.settings))
    }
  }

  public load() {
    const storage = this.getLocalStorage()
    if (storage) {
      const settings: any = JSON.parse(storage.getItem('settings') || '{}') || {}
      this.settings.api = settings.api || this.settings.api
      this.settings.mock = settings.mock || this.settings.mock
      this.settings.network = settings.network || this.settings.network
      this.settings.contract = settings.contract || this.settings.contract
    }
  }

}
