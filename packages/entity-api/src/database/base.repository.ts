// This class does not return populated document. Only returns raw document.
// If document should be populated, then override methods in related service child

import { Model, Types, UpdateQuery } from "mongoose";

export default abstract class IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getAll() {
    const entities = await this.model.find({});
    return entities;
  }

  async getById(entityId: Types.ObjectId) {
    const entity = await this.model.findById(entityId);
    return entity;
  }

  async createBase(entity: T) {
    const entityRecord = new this.model({
      _id: new Types.ObjectId(),
      ...entity,
    });
    await entityRecord.save();
    return entityRecord;
  }

  async updateBase(entityId: Types.ObjectId, newEntity: UpdateQuery<T>) {
    const entity = await this.model.findByIdAndUpdate(entityId, newEntity, {
      new: true,
    });
    return entity;
  }

  async deleteBase(entityId: Types.ObjectId) {
    await this.model.deleteOne({ _id: entityId });
    return entityId;
  }
}
