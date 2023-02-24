export class gameFilterModel {

    constructor(name?: string, categoryId?: number, subCategoryId?: number, plaform?: number, page: number = 0, pageSize: number = 5, sort?: string) {
        this.name = name;
        this.categoryId = categoryId;
        this.subCategoryId = subCategoryId;
        this.platform = plaform;
        this.page = page;
        this.pageSize = pageSize;
        this.sort = sort;
    }
    name?: string;
    categoryId?: number;
    subCategoryId?: number;
    platform?: number;
    page?: number;
    pageSize?: number;
    sort?: string
}