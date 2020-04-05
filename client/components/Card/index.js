import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const CardContainer = styled.div`
  display: grid;
  grid-template-areas:
    'photo title'
    'photo city'
    'photo english'
    'photo experience'
    'links skills';
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 8px 16px;
  grid-gap: 4px;

  border: 1px solid black;
  box-sizing: border-box;
  height: 160px;
`;

const CardTitle = styled.span`
  grid-area: title;
  font-weight: 600;
  font-size: 16px;
  text-transform: Capitalize;
`;

const CardLinks = styled.div`
  grid-area: links;
  display: flex;
  justify-content: center;

  a {
    padding: 4px;
  }
`;
const CardSkills = styled.div`
  grid-area: skills;
`;
const CardSkillItem = styled.span`
  font-size: 12px;
  padding: 4px;
  border: 1px solid red;
  border-radius: 4px;
  margin: 2px;
`;
const CardCity = styled.span`
grid-area: city;
    font-size: 12px;s
`;

const CardExperience = styled.span`
  grid-area: experience;
  font-size: 12px;
`;

const CardEnglish = styled.span`
  grid-area: english;
  font-size: 12px;
`;

const CardPhoto = styled.img`
  grid-area: photo;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  justify-self: center;
`;

const Card = ({
  name,
  city,
  experience,
  skills,
  github,
  linkedin,
  portfolio,
  english,
}) => {
  return (
    <CardContainer>
      <CardTitle>{name}</CardTitle>
      <CardPhoto
        src={
          github
            ? `https://avatars.githubusercontent.com/${github}`
            : '/profile-user.png'
        }
      />
      <CardCity>{city}</CardCity>
      <CardEnglish>{english}</CardEnglish>
      <CardExperience>
        {experience ? 'Con experiencia' : 'Sin experiencia'}
      </CardExperience>
      <CardLinks>
        {github && (
          <Link href={`https://github.com/${github}`}>
            <a target="_blank">GH</a>
          </Link>
        )}
        {linkedin && (
          <Link href={`https://www.linkedin.com/in/${linkedin}`}>
            <a target="_blank">In</a>
          </Link>
        )}
        {portfolio && (
          <Link href={portfolio}>
            <a target="_blank">PS</a>
          </Link>
        )}
      </CardLinks>
      <CardSkills>
        {skills &&
          skills.map(skill => (
            <CardSkillItem key={skill}>{skill}</CardSkillItem>
          ))}
      </CardSkills>
    </CardContainer>
  );
};

export default Card;
