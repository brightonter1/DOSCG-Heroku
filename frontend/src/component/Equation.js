import React, { useState } from 'react'
import { Container, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap'
const Equation = () => {

    const [result, setResult] = useState("")
    const [status, setStatus] = useState("Calculate")

    const onClicked = () => {
        setStatus("Calculating....")
        setTimeout(() => {
            fetch("/equation", {
                method: 'POST',
            })
                .then(obj => obj.json())
                .then(res => setResult(res.result))
        }, 500)
    }

    return (
        <Container style={{ paddingTop: '20px' }}>
            <h3>Assign : Equation</h3>
            <div style={{ border: '1px solid #bbb', width: '230px', marginTop: '10px', marginBottom: '10px' }}></div>
            <p>If A = 21, A + B = 23, A + C = -21  Please create a new function for finding B and C value</p>
            <InputGroup className="mb-3 ">
                <InputGroup.Prepend>
                    <InputGroup.Text >
                        Answer
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    disabled
                    value={result}
                />
            </InputGroup>

            <Button color="primary" style={{ float: 'right' }} onClick={onClicked} >
                {
                    status === "Calculate" || result !== "" ? "Calculate" :
                        <React.Fragment>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            {status}
                        </React.Fragment>
                }
            </Button>
        </Container>
    )
}

export default Equation