import Product from './product';

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'Product 1', 100);
    }).toThrowError('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      new Product('123', '', 100);
    }).toThrowError('Name is required');
  });

  it('should throw error when price is less than zero', () => {
    expect(() => {
      new Product('123', 'Product 3', -1);
    }).toThrowError('Price must be greater then zero');
  });

  it('should change name', () => {
    expect(() => {
      const product = new Product('123', 'Product 3', -1);
      product.changeName('Product 4');
      expect(product.name).toBe('Product 4');
    });
  });

  it('should change price', () => {
    expect(() => {
      const product = new Product('123', 'Product 3', 100);
      product.changePrice(150);
      expect(product.price).toBe(150);
    });
  });
});
