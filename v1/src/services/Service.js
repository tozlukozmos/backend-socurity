class Service {
    constructor(model){
        this.model = model;
    }
    create(data){
        return new this.model(data).save();
    }
    // read(where){
    //     return this.model?.find(where || {});
    // }
    update(id, data){
        return this.model?.findByIdAndUpdate(id, data, {new: true});
    }
    delete(id){
        return this.model?.findByIdAndDelete(id);
    }
}

module.exports = Service;