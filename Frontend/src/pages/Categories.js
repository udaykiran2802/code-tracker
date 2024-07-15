import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaThLarge,
  FaFont,
  FaLink,
  FaLayerGroup,
  FaStream,
  FaTree,
  FaProjectDiagram,
  FaChartLine,
  FaSortAlphaDown,
  FaMicrochip,
  FaSquareRootAlt,
  FaHashtag,
  FaHandHoldingUsd,
  FaPaintBrush,
  FaDatabase
} from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.section`
  padding: 4rem 2rem;
  background-color: #121212;
  min-height: 100vh;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 300px;
  cursor: pointer;
  text-align: center;
  background-color: #1e1e1e;
  border-radius: 0.75rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  animation: ${fadeIn} 0.5s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }

  .card-body {
    padding: 2rem;

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #f0c14b; /* Updated to match consistent color */
      transition: color 0.3s ease;
    }

    .card-title {
      font-size: 1.5rem;
      font-weight: bold;
      color: #f8f9fa; /* Updated to match consistent color */
      margin: 0;
    }
  }

  &:hover .icon {
    color: #ff5722; /* Updated to match consistent color */
  }
`;

const categories = [
  { name: 'Array', icon: <FaThLarge /> },
  { name: 'String', icon: <FaFont /> },
  { name: 'Linked List', icon: <FaLink /> },
  { name: 'Stack', icon: <FaLayerGroup /> },
  { name: 'Queue', icon: <FaStream /> },
  { name: 'Tree', icon: <FaTree /> },
  { name: 'Graph', icon: <FaProjectDiagram /> },
  { name: 'Dynamic Programming', icon: <FaChartLine /> },
  { name: 'Sorting and Searching', icon: <FaSortAlphaDown /> },
  { name: 'Bit Manipulation', icon: <FaMicrochip /> },
  { name: 'Math', icon: <FaSquareRootAlt /> },
  { name: 'Hash Table', icon: <FaHashtag /> },
  { name: 'Greedy', icon: <FaHandHoldingUsd /> },
  { name: 'Design', icon: <FaPaintBrush /> },
  { name: 'Database', icon: <FaDatabase /> }
];

const Categories = () => {
  const navigate = useNavigate();

  const openCategory = (category) => {
    navigate(`/categories/${category}`);
  };

  return (
    <Container id="categories">
      <Row>
        {categories.map((category) => (
          <Card key={category.name} onClick={() => openCategory(category.name)}>
            <div className="card-body">
              <div className="icon">{category.icon}</div>
              <h5 className="card-title">{category.name}</h5>
            </div>
          </Card>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
