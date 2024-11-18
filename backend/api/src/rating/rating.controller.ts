import { Body, Controller, Get, Post } from '@nestjs/common';
import { RatingService } from './rating.service';
import { InsertRatingDto } from 'dtos/requests/insertRatingDto';

@Controller('rating')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Get('/category')
    async getCategories() {
        try {
            const result = await this.ratingService.getCategories();
            return result;
        } catch (ex) {
            throw ex;
        }
    }

    @Post()
    async insertRating(@Body() request: InsertRatingDto[]) {
        try {
            const result = await this.ratingService.insertRating(request);
            return result;
        } catch (ex) {
            throw ex;
        }
    }

}
