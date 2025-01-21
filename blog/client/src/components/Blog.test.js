import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog.js';
import BlogForm from './BlogForm';

describe('Blog view mode', () => {
  let container;
  let mockHandler = jest.fn();
  const blog = {
    title: 'hello',
    author: 'imauthor',
    url: 'imjurl',
    likes: 2,
    userId: { username: 'Pination' },
  };
  beforeEach(() => {
    container = render(<Blog blog={blog} handleLikes={mockHandler} />).container;
  });
  test('renders title and author', () => {
    screen.getByText('hello imauthor');
  });
  test('renders details on command', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const element = container.querySelector('.blogDetails');
    expect(element).not.toHaveStyle('display: none');
  });
  test('has functioning like button', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('like');
    await user.click(button);
    await user.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
describe('BlogForm on create', () => {
  test('calls eventHandler with correct details', async () => {
    let container;
    let mockSubmit = jest.fn();
    let mockTitle = jest.fn();
    let mockAuthor = jest.fn();
    let mockUrl = jest.fn();
    container = render(
      <BlogForm onSubmit={mockSubmit} titleChange={mockTitle} authorChange={mockAuthor} urlChange={mockUrl} />
    ).container;

    const user = userEvent.setup();
    const titleInput = container.querySelector('.Title');
    const authorInput = container.querySelector('.Author');
    const urlInput = container.querySelector('.Url');
    const createButton = screen.getByText('create');

    await user.type(titleInput, 'Testing blog creation');
    await user.type(authorInput, 'IsASuccess');
    await user.type(urlInput, 'link.com');
    await user.click(createButton);

    expect(mockSubmit.mock.calls).toHaveLength(1);
    expect(mockTitle.mock.calls[mockTitle.mock.calls.length - 1][0]).toBe('Testing blog creation');
    expect(mockAuthor.mock.calls[mockAuthor.mock.calls.length - 1][0]).toBe('IsASuccess');
    expect(mockUrl.mock.calls[mockUrl.mock.calls.length - 1][0]).toBe('link.com');
  });
});
