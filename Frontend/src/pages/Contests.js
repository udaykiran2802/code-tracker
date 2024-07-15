import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaCode, FaUtensils, FaLaptopCode, FaGamepad } from 'react-icons/fa';

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
  padding: 20px;
  color: #fff;
  background-color: #121212;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 40px;
  font-size: 3rem;
  color: #f8f8f8;
`;

const ButtonGroup = styled.div`
  text-align: center;
  margin-bottom: 30px;

  button {
    margin: 0 10px;
    padding: 8px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fbb034;
    color: #121212;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      background-color: #ff8800;
      transform: scale(1.05);
    }

    &:focus {
      outline: none;
    }

    svg {
      margin-right: 8px;
    }
  }
`;

const ContestSection = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  margin-bottom: 20px;
`;

const ContestCard = styled.div`
  background: linear-gradient(135deg, #1e1e1e, #2b2b2b);
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  max-width: 1000px;
  margin: 10px auto; /* Center the cards */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-in-out;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
  }

  .card-body {
    text-align: center;

    h3 {
      font-size: 1.25rem;
      margin-bottom: 10px;
      color: #f8f8f8;
    }

    p {
      margin-bottom: 8px;
      font-size: 0.875rem;
      color: #cfcfcf;
    }

    a {
      display: inline-flex;
      align-items: center;
      padding: 8px 12px;
      background-color: #fbb034;
      color: #121212;
      border-radius: 5px;
      text-decoration: none;
      transition: background-color 0.3s, transform 0.2s;

      &:hover {
        background-color: #ff8800;
        transform: scale(1.05);
      }

      svg {
        margin-left: 8px;
      }
    }
  }
`;

const username = 'dinuargo79';
const apiKey = 'ddef221077c15d57433783de3d8641aa1efb0884';

async function fetchContests(resource) {
  const url = `https://clist.by/api/v2/json/contest/?username=${username}&api_key=${apiKey}&resource=${resource}&limit=100`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const now = new Date();
    const upcomingContests = data.objects.filter(contest => new Date(contest.start) > now);
    upcomingContests.sort((a, b) => new Date(a.start) - new Date(b.start));
    return upcomingContests.slice(0, 10).map(contest => ({
      id: contest.id,
      event: contest.event,
      start: new Date(contest.start).toLocaleString(),
      end: new Date(contest.end).toLocaleString(),
      href: contest.href
    }));
  } catch (error) {
    console.error('Error fetching contests:', error);
    return [];
  }
}

function Contests() {
  const [activeContestType, setActiveContestType] = useState('codeforces');
  const [contests, setContests] = useState([]);

  useEffect(() => {
    const fetchAllContests = async () => {
      let contestData = [];
      switch (activeContestType) {
        case 'codeforces':
          contestData = await fetchContests('codeforces.com');
          break;
        case 'codechef':
          contestData = await fetchContests('codechef.com');
          break;
        case 'leetcode':
          contestData = await fetchContests('leetcode.com');
          break;
        case 'atcoder':
          contestData = await fetchContests('atcoder.jp');
          break;
        default:
          break;
      }
      setContests(contestData);
    };

    fetchAllContests();
  }, [activeContestType]);

  return (
    <Container>
      <Title>Contest Tracker</Title>
      <ButtonGroup>
        <button onClick={() => setActiveContestType('codeforces')}><FaCode /> Codeforces</button>
        <button onClick={() => setActiveContestType('codechef')}><FaUtensils /> CodeChef</button>
        <button onClick={() => setActiveContestType('leetcode')}><FaLaptopCode /> LeetCode</button>
        <button onClick={() => setActiveContestType('atcoder')}><FaGamepad /> AtCoder</button>
      </ButtonGroup>
      <ContestSection active={activeContestType === 'codeforces'}>
        {contests.map(contest => (
          <ContestCard key={contest.id}>
            <div className="card-body">
              <h3 className="card-title">{contest.event}</h3>
              <p className="card-text">Start: {contest.start}</p>
              <p className="card-text">End: {contest.end}</p>
              <p className="card-text">
                <a href={contest.href} target="_blank" rel="noopener noreferrer" className="btn btn-contest-link">
                  Contest Link <FaExternalLinkAlt />
                </a>
              </p>
            </div>
          </ContestCard>
        ))}
      </ContestSection>
      <ContestSection active={activeContestType === 'codechef'}>
        {contests.map(contest => (
          <ContestCard key={contest.id}>
            <div className="card-body">
              <h3 className="card-title">{contest.event}</h3>
              <p className="card-text">Start: {contest.start}</p>
              <p className="card-text">End: {contest.end}</p>
              <p className="card-text">
                <a href={contest.href} target="_blank" rel="noopener noreferrer" className="btn btn-contest-link">
                  Contest Link <FaExternalLinkAlt />
                </a>
              </p>
            </div>
          </ContestCard>
        ))}
      </ContestSection>
      <ContestSection active={activeContestType === 'leetcode'}>
        {contests.map(contest => (
          <ContestCard key={contest.id}>
            <div className="card-body">
              <h3 className="card-title">{contest.event}</h3>
              <p className="card-text">Start: {contest.start}</p>
              <p className="card-text">End: {contest.end}</p>
              <p className="card-text">
                <a href={contest.href} target="_blank" rel="noopener noreferrer" className="btn btn-contest-link">
                  Contest Link <FaExternalLinkAlt />
                </a>
              </p>
            </div>
          </ContestCard>
        ))}
      </ContestSection>
      <ContestSection active={activeContestType === 'atcoder'}>
        {contests.map(contest => (
          <ContestCard key={contest.id}>
            <div className="card-body">
              <h3 className="card-title">{contest.event}</h3>
              <p className="card-text">Start: {contest.start}</p>
              <p className="card-text">End: {contest.end}</p>
              <p className="card-text">
                <a href={contest.href} target="_blank" rel="noopener noreferrer" className="btn btn-contest-link">
                  Contest Link <FaExternalLinkAlt />
                </a>
              </p>
            </div>
          </ContestCard>
        ))}
      </ContestSection>
    </Container>
  );
}

export default Contests;
