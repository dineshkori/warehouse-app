export interface ProductArticle {
  art_id: string;
  amount_of: number;
}

export interface Product {
  name: string;
  price: number;
  contain_articles: ProductArticle[];
}
