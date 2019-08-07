import React, { useState } from 'react';
import { Button, Card, Col, Input, Preloader, Row, Icon } from 'react-materialize';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import './Contact.css';

const Contact = () => {
    const clearForm = {
        fromEmail: '',
        fromName: '',
        subject: '',
        body: '',
        copy: false
    };

    const [userInput, setUserInput] = useState(clearForm)
    const [emailValid, setEmailValid] = useState(false);
    const [sendSuccessful, setSendSuccessful] = useState(false);
    const [sendFailure, setSendFailure] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const {fromEmail, fromName, subject, body, copy} = userInput;


    const isEmailValid = (email) => {
        setEmailValid(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    }

    const sendForm = () => {
        setIsSending(true);
        console.log('userInput', userInput);

        fetch('api/send', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(userInput)
        }).then(result => {
            if (result.status === 503) {
                setSendFailure(true);
                setIsSending(false);
                setSendSuccessful(false);
            }
            return result.json();
        }).then(data => {
            if (data.message === "mail sent") {
                setSendSuccessful(true);
                setIsSending(false);
                setSendFailure(false);
                setUserInput(clearForm);
                setEmailValid(false);
            }
        })
    }

    const buttonContent = () => (isSending) 
        ? 
            <Preloader small /> 
        : 
            <div>
                <Icon right>send</Icon>
                <span>Send Email</span>
            </div>

    return (
        <Row>
            <Col s={12} m={6} offset="m3">
                <Card className="darken-1"
                textClassName="grey-text"
                title="Email Form"
                >
                    <Row>
                        <Input
                            value={fromEmail}
                            name="fromEmail"
                            type="email"
                            s={12}
                            label="Email Address"
                            onChange={e => {
                                setUserInput({
                                    ...userInput,
                                    fromEmail: e.target.value
                                })
                                isEmailValid(e.target.value);
                            }}
                            className={(fromEmail.length && !emailValid) ? 'invalid' : 'valid'}
                            autoComplete="off"
                        />
                    </Row>
                    <Row>
                        <Input
                        value={fromName}
                        name="fromName"
                        type="text"
                        s={12}
                        label="Your Name"
                        onChange={e => setUserInput({
                            ...userInput,
                            fromName: e.target.value
                        })}
                        />
                    </Row>
                    <Row>
                        <Input
                            value={subject}
                            name="subject"
                            type="text"
                            s={12}
                            label="Subject"
                            onChange={e => setUserInput({
                                ...userInput,
                                subject: e.target.value
                            })}
                        />
                    </Row>
                    <Row>
                        <Input
                            value={body}
                            name="body"
                            type="textarea"
                            s={12}
                            label="Your message"
                            onChange={e => setUserInput({
                                ...userInput,
                                body: e.target.value
                            })}
                        />
                    </Row>
                    <Row>
                        <Input
                            checked={copy}
                            name="copy"
                            type="checkbox"
                            label="Send a copy to you?"
                            onChange={() => setUserInput({
                                ...userInput,
                                copy: !copy
                            })}
                            s={12}
                        />
                    </Row>
                    <Row>
                        <Button
                            s={3}
                            large
                            wave="light"
                            disabled={!fromEmail || !subject || !body || !emailValid || !fromName || isSending}
                            onClick={sendForm}
                        >
                        {buttonContent()}
                        </Button>
                    </Row>
                    <SweetAlert
                        show={sendSuccessful}
                        type="success"
                        title="Email Sent"
                        text="Your email has been sent.  Thank you!"
                        onConfirm={() => {
                            setSendSuccessful(false);
                            setIsSending(false);
                        }
                    }
                    />
                    <SweetAlert
                        show={sendFailure}
                        type="error"
                        title="Email Failed"
                        text="Your email was not sent.  Please try again."
                        onConfirm={() => {
                            setSendFailure(false);
                            setIsSending(false)
                        }
                        }
                    />
                </Card>
            </Col>
        </Row>
    );
};

export default Contact;