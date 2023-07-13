export class DrupalLink {
    constructor(resource) {
        this.uri = null;
        this.full_url = null;
        this.title = null;
        this.options = null;
        if (resource) {
            // Fill all resource properties.
            Object.keys(resource).forEach(key => {
                if (this.hasOwnProperty(key)) {
                    this[key] = resource[key];
                }
            });
        }
    }
}
