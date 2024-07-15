import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import { FaLink, FaStickyNote, FaEdit, FaTrash } from 'react-icons/fa';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, PieController } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { AuthContext } from '../store/authContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title, PieController);

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

const Container = styled.div`
  padding: 2rem;
  background-color: #121212;
  color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const TitleStyled = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 36px;
  color: #ffffff;
  margin-left: 1rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  gap: 2rem;
`;

const Form = styled.form`
  background-color: #1e1e1e;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin-bottom: 20px;
  width: 65%;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #b0b0b0;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #424242;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  transition: border-color 0.3s;

  &:focus {
    border-color: #f0c14b;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #424242;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  transition: border-color 0.3s;

  &:focus {
    border-color: #f0c14b;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #424242;
  border-radius: 5px;
  background-color: #2c2c2c;
  color: #e0e0e0;
  transition: border-color 0.3s;

  &:focus {
    border-color: #f0c14b;
  }
`;

const Button = styled.button`
  background-color: #f0c14b;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #f0a420;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const TableContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #1e1e1e;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const Th = styled.th`
  padding: 10px;
  border: 1px solid #424242;
  background-color: #f0c14b;
  color: #ffffff;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #424242;
  text-align: left;
  color: #e0e0e0;

  a {
    color: #f0c14b;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    background: none;
    border: none;
    color: #f8f9fa;
    cursor: pointer;
    font-size: 16px;
    transition: color 0.3s;

    &:hover {
      color: #f0c14b;
    }
  }
`;

const Dashboard = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #e0e0e0;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 250px;
`;

const Stats = styled.div`
  margin-top: 20px;
`;

const StatItem = styled.p`
  margin: 5px 0;
  font-size: 18px;

  &.solved {
    color: #28a745;
  }

  &.unsolved {
    color: #dc3545;
  }

  &.attempted {
    color: #ffc107;
  }
`;

const NotesPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #e0e0e0;
  z-index: 1000;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #f8f9fa;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CategoryDetail = () => {
  const { categoryName } = useParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const [problems, setProblems] = useState([]);
  const [form, setForm] = useState({ name: '', link: '', notes: '', status: 'solved' });
  const [editIndex, setEditIndex] = useState(null);
  const [showNotes, setShowNotes] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn && user) {
      axios
        .get(`http://localhost:5000/api/problems/${categoryName}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          setProblems(response.data);
        })
        .catch((error) => {
          console.error('There was an error fetching the problems!', error);
          toast.error('Failed to fetch problems');
        });
    }
  }, [categoryName, isLoggedIn, user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedProblem = { ...form, id: problems[editIndex]._id };
      axios
        .put(`http://localhost:5000/api/problems/${updatedProblem.id}`, updatedProblem, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        .then((response) => {
          const updatedProblems = problems.map((problem, index) =>
            index === editIndex ? response.data : problem
          );
          setProblems(updatedProblems);
          setEditIndex(null);
          toast.success('Problem updated successfully');
        })
        .catch((error) => {
          console.error('There was an error updating the problem!', error);
          toast.error('Failed to update problem');
        });
    } else {
      axios
        .post(
          'http://localhost:5000/api/problems',
          { ...form, category: categoryName },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }
        )
        .then((response) => {
          setProblems([...problems, response.data]);
          toast.success('Problem added successfully');
        })
        .catch((error) => {
          console.error('There was an error adding the problem!', error);
          toast.info('Please login to add the problems/fill the required details to add the problems');
        });
    }
    setForm({ name: '', link: '', notes: '', status: 'solved' });
  };

  const handleEdit = (index) => {
    setForm(problems[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const problemId = problems[index]._id;
    axios
      .delete(`http://localhost:5000/api/problems/${problemId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => {
        setProblems(problems.filter((_, i) => i !== index));
        toast.success('Problem deleted successfully');
      })
      .catch((error) => {
        console.error('There was an error deleting the problem!', error);
        toast.error('Failed to delete problem');
      });
  };

  const totalProblems = problems.length;
  const solvedProblems = problems.filter((p) => p.status === 'solved').length;
  const unsolvedProblems = problems.filter((p) => p.status === 'unsolved').length;
  const attemptedProblems = problems.filter((p) => p.status === 'attempted').length;

  return (
    <Container>
      <Header>
        <TitleStyled>{categoryName}</TitleStyled>
      </Header>
      <Content>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="name">Problem Name:</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter the name of the problem"
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="link">Link to Problem:</Label>
            <Input
              type="text"
              id="link"
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Enter the link to the problem"
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="notes">Notes:</Label>
            <TextArea
              id="notes"
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Enter any notes for the problem"
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="status">Status:</Label>
            <Select id="status" name="status" value={form.status} onChange={handleChange}>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
              <option value="attempted">Attempted</option>
            </Select>
          </InputGroup>
          <Button type="submit">{editIndex !== null ? 'Update Problem' : 'Add Problem'}</Button>
        </Form>
        <Dashboard>
          <ChartContainer>
            <Pie
              ref={chartRef}
              data={{
                labels: ['Solved', 'Unsolved', 'Attempted'],
                datasets: [
                  {
                    label: 'Problems',
                    data: [solvedProblems, unsolvedProblems, attemptedProblems],
                    backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                    borderColor: ['#28a745', '#dc3545', '#ffc107'],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: 'Problem Status Distribution',
                    color: '#e0e0e0',
                  },
                  legend: {
                    labels: {
                      color: '#e0e0e0',
                    },
                  },
                },
              }}
            />
          </ChartContainer>
          <Stats>
            <StatItem className="solved">Solved: {solvedProblems}</StatItem>
            <StatItem className="unsolved">Unsolved: {unsolvedProblems}</StatItem>
            <StatItem className="attempted">Attempted: {attemptedProblems}</StatItem>
            <StatItem>Total: {totalProblems}</StatItem>
          </Stats>
        </Dashboard>
      </Content>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Name</Th>
              <Th>Link</Th>
              <Th>Notes</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={index}>
                <Td>{problem.name}</Td>
                <Td>
                  <a href={problem.link} target="_blank" rel="noopener noreferrer">
                    <FaLink />
                  </a>
                </Td>
                <Td>
                  <button onClick={() => setShowNotes(index)}>
                    <FaStickyNote />
                  </button>
                </Td>
                <Td>{problem.status}</Td>
                <Td>
                  <button onClick={() => handleEdit(index)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(index)}>
                    <FaTrash />
                  </button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
      {showNotes !== null && (
        <NotesPopup>
          <CloseButton onClick={() => setShowNotes(null)}>&times;</CloseButton>
          <p>{problems[showNotes].notes}</p>
        </NotesPopup>
      )}
    </Container>
  );
};

export default CategoryDetail;
