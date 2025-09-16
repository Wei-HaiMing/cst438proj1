import HomeScreen from '@/app/jesttest';
import { render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Welcome!');
  });
  test('smoke', () => expect(true).toBe(true));
  test('smoke2', () => expect("89" === "banana").toBe(false));
  it('renders correctly', () => {
    const tree = renderer
      .create(<HomeScreen />)
      .toJSON();
      
    expect(tree).toMatchSnapshot();
  });
});




