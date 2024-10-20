import PropTypes from 'prop-types';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { RESULTS_PER_PAGE } from '../utils/appConstants';

Pagination.propTypes = {
  count: PropTypes.number,
};

const PaginationDiv = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PaginationP = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const PaginationButtonsDiv = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  &:disabled {
    color: var(--color-grey-400);
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current page from URL
  const currentPage = searchParams.get('page') ? +searchParams.get('page') : 1;
  const pageCount = Math.ceil(count / RESULTS_PER_PAGE);

  function handleNextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set('page', next);
    setSearchParams(searchParams);
  }

  function handlePreviousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set('page', prev);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <PaginationDiv>
      <PaginationP>
        Showing <span>{(currentPage - 1) * RESULTS_PER_PAGE + 1}</span> to{' '}
        <span>
          {currentPage !== pageCount ? currentPage * RESULTS_PER_PAGE : count}
        </span>{' '}
        of <span>{count}</span> results
      </PaginationP>
      <PaginationButtonsDiv>
        <PaginationButton
          disabled={currentPage === 1}
          onClick={handlePreviousPage}
        >
          <HiChevronLeft /> <span>Previous</span>
        </PaginationButton>
        <PaginationButton
          disabled={currentPage === pageCount}
          onClick={handleNextPage}
        >
          <span>Next</span> <HiChevronRight />
        </PaginationButton>
      </PaginationButtonsDiv>
    </PaginationDiv>
  );
}

export default Pagination;
