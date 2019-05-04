import React, { useState } from 'react';
import { Button, Card, Col, Input, Preloader, Row, Icon } from 'react-materialize';
import SweetAlert from 'sweetalert-react';
import 'sweetalert/dist/sweetalert.css';
import './Contact.css';

const Contact = () => {
    const [fromEmail, setFromEmail] = useState('');
    const [fromName, setFromName] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [copy, setCopy] = useState(false);
    const [sendSuccessful, setSendSuccessful] = useState(false);
    const [sendFailure, setSendFailure] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [isSending, setIsSending] = useState(false);

    const isEmailValid = (email) => {
        setEmailValid(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    }

    const sendForm = () => {
        setIsSending(true);

        fetch('api/send', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify({
                fromEmail,
                fromName,
                subject,
                body,
                copy
            })
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
                setFromEmail("");
                setFromName("");
                setSubject("");
                setBody("");
                setCopy(false);
                setEmailValid(false);
            }
        })
    }

    const buttonContent = () => {
        if (isSending) {
            return <Preloader small />
        } else {
            return (
                <div>
                    <Icon right>send</Icon>
                    <span>Send Email</span>
                </div>
            )
        }
    }
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
                                setFromEmail(e.target.value);
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
                        onChange={e => setFromName(e.target.value)}
                        />
                    </Row>
                    <Row>
                        <Input
                            value={subject}
                            name="subject"
                            type="text"
                            s={12}
                            label="Subject"
                            onChange={e => setSubject(e.target.value)}
                        />
                    </Row>
                    <Row>
                        <Input
                            value={body}
                            name="body"
                            type="textarea"
                            s={12}
                            label="Your message"
                            onChange={e => setBody(e.target.value)}
                        />
                    </Row>
                    <Row>
                        <Input
                            checked={copy}
                            name="copy"
                            type="checkbox"
                            label="Send a copy to you?"
                            onChange={() => setCopy(!copy)}
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