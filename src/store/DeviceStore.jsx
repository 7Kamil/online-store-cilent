import {makeAutoObservable} from 'mobx';

class DeviceStore {
    constructor() {
        this._types = []
        this._devices = []
        this._query = {}
        this._page = 1
        this._totalCount = 0
        this._limit = 2
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }
    setBrands(brands) {
        this._brands = brands
    }
    setDevices(devices) {
        this._devices = devices
    }

    setQuery(query) {
        this._query = query
    }

    setLimit(limit) {
        this._limit = limit
    }

    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types() {
        return this._types
    }
    get devices() {
        return this._devices
    }

    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

    get query() {
        return this._query
    }
}

export default DeviceStore;