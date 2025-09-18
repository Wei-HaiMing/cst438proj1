import Login from '@/app/login';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import renderer from 'react-test-renderer';

const mockPush = jest.fn();
const mockReplace = jest.fn();
const mockGetAllAsync = jest.fn();
const mockExecAsync = jest.fn();


jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
        replace: mockReplace,
    }),
}));

jest.mock("expo-sqlite", () => ({
    useSQLiteContext: () => ({
        getAllAsync: mockGetAllAsync,
        execAsync: mockExecAsync,
    }),
}));

describe("<Login />", () => {

    beforeEach(() => {
        jest.clearAllMocks();

        mockGetAllAsync.mockResolvedValue([]);
        mockExecAsync.mockResolvedValue(undefined);
    });

    it("renders login page correctly", () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    
});