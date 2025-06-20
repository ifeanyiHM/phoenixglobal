import { Link } from "react-router-dom";

import emailjs from "@emailjs/browser";
import { FormEvent, useEffect, useReducer } from "react";
import AlertBox from "../Utilities/AlertBox";
// import PageHeader from "./PageHeader";

interface StateProps {
  name: string;
  clientEmail: string;
  message: string;
  alertMessage: string;
  isMessageSending: boolean;
  messageSent: boolean;
}

interface ActionProps {
  type: string;
  payload?: string | boolean;
}

const initialState = {
  name: "",
  clientEmail: "",
  message: "",
  isMessageSending: false,
  alertMessage: "",
  messageSent: false,
};

function reducer(state: StateProps, action: ActionProps) {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload as string };
    case "email":
      return { ...state, clientEmail: action.payload as string };
    case "message":
      return { ...state, message: action.payload as string };
    case "alert":
      return { ...state, alertMessage: action.payload as string };
    case "sent":
      return { ...state, messageSent: action.payload as boolean };
    case "sending":
      return { ...state, isMessageSending: action.payload as boolean };
    case "reset":
      return initialState;
    default:
      throw new Error("unknown action");
  }
}

function Contact() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    name,
    clientEmail,
    message,
    alertMessage,
    isMessageSending,
    messageSent,
  } = state;

  useEffect(
    function () {
      if (messageSent) {
        const timeOut = setTimeout(() => {
          dispatch({ type: "sent", payload: false });
        }, 5000);

        return () => clearTimeout(timeOut);
      }
    },
    [messageSent]
  );

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const serviceId = "service_7uvbyms";
    const templateId = "template_lei4j7a";
    const publicKey = "NUCZEfqoTrlkgELZ4";

    const templateParams = {
      from_name: name,
      from_email: clientEmail,
      message,
      to_name: "Ifeanyi",
    };

    try {
      dispatch({ type: "sending", payload: true });
      if (!clientEmail && !message) return;
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );
      if (response.status !== 200) throw new Error("Email not sent!");
      dispatch({ type: "sent", payload: true });
      dispatch({ type: "alert", payload: "Message sent successfully!" });
      dispatch({ type: "name", payload: "" });
      dispatch({ type: "email", payload: "" });
      dispatch({ type: "message", payload: "" });
    } catch (error) {
      dispatch({ type: "alert", payload: (error as Error).message });
    } finally {
      dispatch({ type: "sending", payload: false });
    }
  };

  return (
    <div className="contact">
      {messageSent && <AlertBox>{alertMessage}</AlertBox>}

      {/* <PageHeader>
        <h1>Contact Us</h1>
        <span>
          <Link to="/">Home</Link> / Contact Us
        </span>
      </PageHeader> */}

      <div className="form-container">
        <div className="background-container">
          <div className="ct">
            <div className="form">
              <h1>Get In Touch</h1>
              <p className="form-desc">
                Please fill out the form below to send us an email and we will
                get back to you as soon as possible.
              </p>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name">
                    Name
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) =>
                        dispatch({ type: "name", payload: e.target.value })
                      }
                    />
                  </label>
                  <label htmlFor="email">
                    Email
                    <input
                      type="text"
                      id="email"
                      value={clientEmail}
                      onChange={(e) =>
                        dispatch({ type: "email", payload: e.target.value })
                      }
                    />
                  </label>
                </div>
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={message}
                  onChange={(e) =>
                    dispatch({ type: "message", payload: e.target.value })
                  }
                ></textarea>
                <button
                  type="submit"
                  disabled={isMessageSending}
                  className={isMessageSending ? "isSending" : ""}
                >
                  {isMessageSending ? "SENDING..." : "SEND MESSAGE"}
                  <span></span>
                </button>
              </form>
            </div>

            <div className="contact-info">
              <h4>Contact Info</h4>
              <div className="contact-item">
                <p>
                  <span className="glyphicon glyphicon-map-marker">
                    4th floor, Adeboyega Adeleke and co
                  </span>
                  <br />
                  <span>8 Strchan str off Igbosere road,</span>
                  <br />
                  <span>Lagos-Island, Lagos</span>
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>Phone</span>
                  <br /> +234 809 606 8042
                  <br /> +234 704 994 3393
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>Email</span> <br />
                  info@1502properties.com
                </p>
              </div>
            </div>
          </div>
          <ul>
            <li>
              <Link to="#">
                <img
                  src="/socials/facebook.png"
                  alt="facebook"
                  title="facebook"
                  loading="lazy"
                  width="auto"
                  height="auto"
                />
              </Link>
            </li>
            <li>
              <Link to="#">
                <img
                  src="/socials/instagram.png"
                  alt="instagram"
                  title="instagram"
                  loading="lazy"
                  width="auto"
                  height="auto"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Contact;
