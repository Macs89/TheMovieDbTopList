import { expect } from 'chai';
import {
  filterByText,
  getOrderedDataByPage,
  getNewOrderDirecton,
  findAll,
} from './filter';

const createExampleData = (title, length, placement, voteAverage, status) => ({
  title,
  length,
  placement,
  voteAverage,
  status,
});
const exampleData = [
  createExampleData(`Hurray we are wining`, 120, 13, 8.5, 'rumored'),
  createExampleData(`It's winter again!`, 130, 7, 7.3, 'canceled'),
  createExampleData(`Welcome to New York`, 90, 50, 3, 'rumored'),
  createExampleData(
    `Harry Potter and the Philosopher's Stone`,
    178,
    34,
    4.6,
    'finished'
  ),
  createExampleData(
    `Harry Potter and the Goblet of Fire`,
    85,
    1,
    9.8,
    'finished'
  ),
];

describe('filterByText', () => {
  it('should show only data that contains the search text', () => {
    const result = filterByText(exampleData, 'title', 'win');
    expect(result)
      .to.be.an('array')
      .that.has.members([exampleData[0], exampleData[1]]);
  });

  it('should find data even if the text capitalization doesn`t match', () => {
    const result = filterByText(exampleData, 'title', 'harry');
    expect(result)
      .to.be.an('array')
      .that.has.members([exampleData[3], exampleData[4]]);
  });
});

describe('getOrderedDataByPage', () => {
  it('should show 2 rows', () => {
    const result = getOrderedDataByPage(exampleData, 'length', 'asc', 1, 2);
    expect(result).to.be.an('array').that.has.a.lengthOf(2);
  });

  it('should show the data ordered by placement', () => {
    const result = getOrderedDataByPage(exampleData, 'placement', 'asc', 1, 3);
    expect(result)
      .to.be.an('array')
      .that.has.ordered.members([exampleData[3], exampleData[2]]);
  });
});

describe('getNewOrderDirecton', () => {
  it('should change to ascending', () => {
    const result = getNewOrderDirecton('title', 'placement', 'desc');
    expect(result).to.be.eql('asc');
  });

  it('should change to descending', () => {
    const result = getNewOrderDirecton('title', 'title', 'asc');
    expect(result).to.be.eql('desc');
  });
});

describe('findAll', () => {
  it('should find all rumored movies', () => {
    const result = findAll(exampleData, { status: 'rumored' });
    expect(result)
      .to.be.an('array')
      .that.has.a.lengthOf(2)
      .that.has.members([exampleData[0], exampleData[2]]);
  });
});
