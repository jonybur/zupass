import { Separator } from "@pcd/passport-ui";
import styled from "styled-components";
import { Secp256R1PCD } from "./secp256r1";

export function Secp256R1CardBody({ pcd }: { pcd: Secp256R1PCD }) {
  return (
    <Container>
      <p>PCD for ecdsa secp256r1</p>

      <Separator />
      {/* 
      <FieldLabel>Ticket ID</FieldLabel>
      <TextContainer>
        {pcd.claim.partialTicket.ticketId || "HIDDEN"}
      </TextContainer>
      <Spacer h={8} />
      
      <FieldLabel>Ticket ID</FieldLabel>
      <TextContainer>
        {pcd.claim.partialTicket.ticketId || "HIDDEN"}
      </TextContainer>
      <Spacer h={8} />

      <FieldLabel>Ticket ID</FieldLabel>
      <TextContainer>
        {pcd.claim.partialTicket.ticketId || "HIDDEN"}
      </TextContainer>
      <Spacer h={8} />

      <FieldLabel>Ticket ID</FieldLabel>
      <TextContainer>
        {pcd.claim.partialTicket.ticketId || "HIDDEN"}
      </TextContainer>
      <Spacer h={8} /> */}
    </Container>
  );
}

const Container = styled.div`
  padding: 16px;
  overflow: hidden;
  width: 100%;
`;
