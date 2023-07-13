export class DrupalEntityCollection {
    constructor(type, resource, entityClass) {
        this.type = null;
        this.data = [];
        this.key_conversions = {};
        this.type = type + '_collection';
        this.fill(resource, entityClass);
    }
    fill(resources, entityClass) {
        if ("data" in resources && Array.isArray(resources.data)) {
            Object.keys(resources.data).forEach(key => {
                // this.data[key] = new entityClass(resources.data[key]);
                this.data[key] = new entityClass(resources.data[key]);
            });
        }
    }
}
