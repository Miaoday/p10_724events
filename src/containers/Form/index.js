import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { 
  setTimeout(resolve, 1000); // 1 second delay before resolving the Promise
})

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    selection: "",
    email: "",
    message: ""
  });

  const handleChanged = (form, value ) => {
    setFormData({...formData, [form]: value});
  };

  // We try to call mockContactApi      
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" value={formData.nom} onChange={(value)=> handleChanged("nom", value)} required/>
          <Field placeholder="" label="Prénom" value={formData.prenom} onChange={(value)=> handleChanged("prenom", value)} required/>
          <Select
            selection={["Personel", "Entreprise"]}
            value= {formData.selection}
            onChange={(value) => handleChanged("selection", value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            required
          />
          <Field placeholder="" label="Email" type={FIELD_TYPES.INPUT_TEXT} value={formData.email} onChange={(value)=> handleChanged("email", value)} required/>
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer" }
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={(value)=> handleChanged("message", value)}
            required
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => "Message Envoye",
}

export default Form;
