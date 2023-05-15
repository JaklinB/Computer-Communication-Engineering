import { FaCopy } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./styles.css";

function PublicationFees() {
  const { t } = useTranslation("submitPaper");

  const containers = document.querySelectorAll(".container");

  containers.forEach((container) => {
    container.addEventListener("click", () => {
      containers.forEach((container) => container.classList.remove("active"));
      container.classList.add("active");
    });
  });

  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("Text copied to clipboard: ", text);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  }

  return (
    <div>
      <h1>{t("publication_fees_label")}</h1>
      <div className="wrapper">
        <div className="table basic">
          <div className="price-section">
            <div className="price-area">
              <div className="inner-area">
                <span className="text">BGN</span>
                <span className="price">120</span>
              </div>
            </div>
          </div>
          <div
            className="package-name"
            data-translation={t("publication_fee_label")}
          ></div>
        </div>
        <div className="table premium">
          <div className="ribbon">
            <span>{t("recommended")}</span>
          </div>
          <div className="price-section">
            <div className="price-area">
              <div className="inner-area">
                <span className="text">BGN</span>
                <span className="price">50</span>
              </div>
            </div>
          </div>
          <div
            className="package-name"
            data-translation={t("publication_fee_year_label")}
          ></div>
          <ul className="features">
            <li>
              <span className="list-name">{t("including_postage")}</span>
              <span className="icon check">
                <i className="fas fa-check"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div id="invoice-POS">
        <center id="top">
          <div className="logo"></div>
          <div className="info">
            <h2>{t("tu_sofia")}</h2>
          </div>
        </center>

        <div id="mid">
          <div className="info">
            <h2>{t("invoice_details")}</h2>
            <div className="tableitem-right">
              <p>{t("address")}</p>
              <button
                className="copy-button"
                onClick={() => copyToClipboard(t("address"))}
              >
                <FaCopy />
              </button>
            </div>

            <div className="location_image"></div>
          </div>
        </div>

        <div id="bot">
          <div id="table">
            <table>
              <tr className="service">
                <td className="tableitem">
                  <p className="itemtext">{t("bank_transfer_label")}</p>
                </td>
                <td className="tableitem-right">
                  <p className="itemtext">{t("bank_transfer_info")}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(t("bank_transfer_info"))}
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
              <tr className="service">
                <td className="tableitem">
                  <p className="itemtext">{t("UIC_label")}</p>
                </td>
                <td className="tableitem-right">
                  <p className="itemtext">{t("UIC_info")}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(t("UIC_info"))}
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
              <tr className="service">
                <td className="tableitem">
                  <p className="itemtext">{t("VAT_label")}</p>
                </td>
                <td className="tableitem-right">
                  <p className="itemtext">{t("VAT_info")}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(t("VAT_info"))}
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
              <tr className="service">
                <td className="tableitem">
                  <p className="itemtext">{t("accountable_person_label")}</p>
                </td>
                <td className="tableitem-right">
                  <p className="itemtext">{t("accountable_person_info")}</p>
                  <button
                    className="copy-button"
                    onClick={() =>
                      copyToClipboard(t("accountable_person_info"))
                    }
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
              <tr className="service">
                <td className="tableitem">
                  <p className="itemtext">{t("IBAN_label")}</p>
                </td>
                <td className="tableitem-right">
                  <p className="itemtext">{t("IBAN_info")}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(t("IBAN_info"))}
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
              <tr className="service">
                <td className="tableitem">
                  <p className="itemtext">{t("BIC_label")}</p>
                </td>
                <td className="tableitem-right">
                  <p className="itemtext">{t("BIC_info")}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(t("BIC_info"))}
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
              <tr className="service">
                <td className="tableitem">
                  <p className="itemtext">{t("contract_num_label")}</p>
                </td>
                <td className="tableitem-right">
                  <p className="itemtext">{t("contract_num_info")}</p>
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(t("contract_num_info"))}
                  >
                    <FaCopy />
                  </button>
                </td>
              </tr>
            </table>
          </div>

          <div id="legalcopy">
            <p className="legal">
              <strong> {t("payment_label_info")} </strong>
              {t("payment_info")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicationFees;
