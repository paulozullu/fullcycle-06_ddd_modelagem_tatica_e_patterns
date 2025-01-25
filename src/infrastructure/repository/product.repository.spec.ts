import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../db/sequelize/model/product.model';
import Product from '../../domain/entity/product';
import ProductRepository from './product.repository';

describe('Product repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product 1', 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel).not.toBeNull();
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 1',
      price: 100,
    });
  });

  it('should update a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product 1', 100);

    await productRepository.create(product);

    product.changeName('product 2');
    product.changePrice(200);

    await productRepository.update(product);

    const productModel = await ProductModel.findOne({ where: { id: '1' } });

    expect(productModel).not.toBeNull();
    expect(productModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'product 2',
      price: 200,
    });
  });

  it('should find a product', async () => {
    const productRepository = new ProductRepository();
    const product = new Product('1', 'product 1', 100);

    await productRepository.create(product);

    const foundProduct = await productRepository.find('1');

    expect(foundProduct).not.toBeNull();
    expect(foundProduct?.id).toBe('1');
    expect(foundProduct?.name).toBe('product 1');
    expect(foundProduct?.price).toBe(100);
  });

  it('should find all products', async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product('1', 'product 1', 100);
    const product2 = new Product('2', 'product 2', 200);

    await productRepository.create(product1);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toEqual(foundProducts);
    expect(foundProducts).toHaveLength(2);
    expect(foundProducts[0].id).toBe('1');
    expect(foundProducts[0].name).toBe('product 1');
    expect(foundProducts[0].price).toBe(100);
    expect(foundProducts[1].id).toBe('2');
    expect(foundProducts[1].name).toBe('product 2');
    expect(foundProducts[1].price).toBe(200);
  });
});
