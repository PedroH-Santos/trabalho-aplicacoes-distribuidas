import { Injectable } from '@nestjs/common';
import { InsertRatingDto } from 'dtos/requests/insertRatingDto';
import { RatingRepository } from './rating.repository';

@Injectable()
export class RatingService {
    constructor(private readonly ratingRepository: RatingRepository) { }

    async insertRating (data: InsertRatingDto[]) {
        try {
            return await this.ratingRepository.insertRatings(data);
        } catch (ex) {
            console.error(ex);
            throw new Error('Não foi possível inserir as avaliacoes.');
        }
    }

    async getCategories() {
        try {
            return await this.ratingRepository.getCategories();
        } catch (ex) {
            console.error(ex);
            throw new Error('Não foi possível obter as categorias de avaliacao.');
        }
    }

 
}
