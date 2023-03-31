import renderer from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './button';

it('Button with text renders correclty', () => {
    const tree = renderer.create(<Button text='Test' />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Button without text renders correctly', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Disabled button renders correctly', () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Button with loader renders correctly', () => {
    const tree = renderer.create(<Button isLoader />).toJSON();
    expect(tree).toMatchSnapshot();
});

it('Callback works correctly', () => {
    const callBack = jest.fn();
    render(<Button onClick={callBack}/>);
    fireEvent.click(screen.getByRole('button'));
    expect(callBack).toHaveBeenCalled();
});