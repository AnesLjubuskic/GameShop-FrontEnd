export class gameModel {
    id?: number;
    name: string;
    price: number;
    description: string;
    releaseDate: Date;
    imageURL: string;
    quantity: number;
    editMode: true;
    softDelete: true;
    platform: number;
    categoryId: number;
    subCategoryId: number;
    platformName?: string;
    categoryName?: string;
    subcategoryName?: string;
}