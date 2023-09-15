import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { createItemDto } from './dto/create-item.dto'
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService ){}

    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }
    @Get(':id')
    async findOne(@Param('id') id): Promise <Item> {
        return this.itemsService.findOne(id);
    }
    @Post()
    create(@Body() createItemDto: createItemDto ): Promise<Item> {
        return this.itemsService.create(createItemDto);
    }
    @Delete(':id')
    delete(@Param('id') id): string{
        return `delete ${id}`;
    }
    @Put(":id")
    update(@Body() createItemDto: createItemDto, @Param('id') id): string {
        return `Name: ${createItemDto.name} Desc: ${createItemDto.description} qty: ${createItemDto.qty}`
    }
}
