import renderer from 'react-test-renderer';
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

it('Circle without text renders correclty', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Circle with text renders correclty', () => {
    const tree = renderer.create(<Circle letter='Test' />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Circle with text head renders correclty', () => {
    const tree = renderer.create(<Circle head='Test' />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Circle with react-element head renders correclty', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Circle with text tail renders correclty', () => {
    const tree = renderer.create(<Circle tail='Test' />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Circle with react-element tail renders correclty', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Circle with index renders correclty', () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Small circle renders correclty', () => {
    const tree = renderer.create(<Circle isSmall />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Default circle renders correclty', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Changing circle renders correclty', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Modified circle renders correclty', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
});