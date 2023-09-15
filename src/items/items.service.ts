import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemSchema } from './schemas/item.schema';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
    constructor(@InjectModel('Item') private itemModel: Model<Item>){
        console.log('ItemsService instantiated');
        console.log('itemModel:', itemModel);
    }

    async findAll(): Promise<Item[]> {
        return await this.itemModel.find().exec();
    }
    async findOne(id: string): Promise<Item>{
        return await this.itemModel.findOne({_id: id});
    }

    async create(item: Item): Promise<Item> {
        const newItem = new this.itemModel(item);
        return await newItem.save();
    }
    async delete(id: string): Promise<Item>{
        return await this.itemModel.findByIdAndRemove(id);
    }

    async update(id: string, item: Item): Promise<Item> {
        return await this.itemModel.findByIdAndUpdate(id, item, {new: true});
    }
}
