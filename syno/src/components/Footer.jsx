import React from 'react'
import styled from 'styled-components'
import CurrentTrack from './CurrentTrack'
import PlayerControls from './PlayerControls'
import Volume from './Volume'

export default function Footer() {
  return (
    <Container> 
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </Container>
  )
}

const Container = styled.div`

  background-color: #0C0A0D;
  width: 100%;
  min-height: 96.5px;
  max-height: 96.5px;
  position: sticky;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`