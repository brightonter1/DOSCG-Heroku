import React, { useState } from 'react'
import { Container, Button, InputGroup, FormControl, Spinner } from 'react-bootstrap'
const Sequence = () => {

    const [result, setResult] = useState("")
    const [status, setStatus] = useState("Calculate")

    const onClicked = () => {
        setStatus("Calculating....")
        setTimeout(() => {
            fetch("/sequence", {
                method: 'POST',
            })
                .then(obj => obj.json())
                .then(result => {
                    var data = result.result
                    setResult("X : " + data[0] + ", Y : " + data[1] + ", Z : " + data[6])
                })
        }, 500)
    }

    return (
        <Container style={{ paddingTop: '20px' }}>
            <h3>Assign : Sequence</h3>
            <div style={{ border: '1px solid #bbb', width: '230px', marginTop: '10px', marginBottom: '10px' }}></div>
            <p>X,Y,5,6,15,23,Z  Please create a new function for finding X, Y, Z value</p>
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

export default Sequence