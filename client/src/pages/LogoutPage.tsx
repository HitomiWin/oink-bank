import React, { useEffect, memo, VFC } from 'react'
import { Row, Col, Card } from 'react-bootstrap'

import { useAuthContext } from '../contexts/AuthContext'
export const LogoutPage: VFC = memo(() => {
  const { logout } = useAuthContext()


	useEffect( () => {
	 logout()
	})

	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Log Out</Card.Title>

							<Card.Text>Please wait while you're being logged out...</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
  });