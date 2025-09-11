import HomeScreen from '@/app/jesttest';
import { render } from '@testing-library/react-native';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<HomeScreen />);

    getByText('Welcome!');
  });
  test('smoke', () => expect(true).toBe(true));
});