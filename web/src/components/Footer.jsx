import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle
} from "react-icons/ai";

function FooterSection({ title, children }) {
  return (
    <ul className="customer-service-section container reset-justify column gap-half padded-sm">
      <h5 className="mb-sm">{title}</h5>
      {children}
    </ul>
  );
}

export default function Footer() {
  return (
    <>
      <div className="container justify">
        <hr className="mt-lg mb text-center width-75 opacity-20" />
      </div>
      <div className="container gap-sm mb">
        <FooterSection title="CUSTOMER SERVICE">
          <li>
            <span className="section-item opacity-65">Help Centre</span>
          </li>
          <li>
            <span className="section-item opacity-65">Order Tracking</span>
          </li>
          <li>
            <span className="section-item opacity-65">Free Shipping</span>
          </li>
          <li>
            <span className="section-item opacity-65">Return and Refund</span>
          </li>
          <li>
            <span className="section-item opacity-65">Overseas Product</span>
          </li>
          <li>
            <span className="section-item opacity-65">Contact Us</span>
          </li>
        </FooterSection>
        <FooterSection title="ABOUT PLAZA">
          <li>
            <span className="section-item opacity-65">About Us</span>
          </li>
          <li>
            <span className="section-item opacity-65">Seller Centre</span>
          </li>
          <li>
            <span className="section-item opacity-65">Privacy Policy</span>
          </li>
          <li>
            <span className="section-item opacity-65">Flash Deals</span>
          </li>
          <li>
            <span className="section-item opacity-65">Media Contract</span>
          </li>
        </FooterSection>

        <FooterSection title="PAYMENT">
          <li>
            <div className="payment-image-container">
              <img
                src="https://blog.logomyway.com/wp-content/uploads/2022/02/visa-logo.png"
                alt="visa"
              />
            </div>
          </li>
          <li>
            <div className="payment-image-container">
              <img
                src="https://www.mastercard.com/content/dam/public/brandcenter/en/mastercard-logo.png"
                alt="mastercard"
              />
            </div>
          </li>
          <li>
            <div className="payment-image-container">
              <img
                src="https://i.pinimg.com/originals/d5/70/c8/d570c81a5c1eca5cdd95067fbb0a57e5.png"
                alt="bpi"
              />
            </div>
          </li>
          <li>
            <div className="payment-image-container">
              <img
                src="https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_1280.png"
                alt="paypal"
              />
            </div>
          </li>
        </FooterSection>
        <FooterSection title="FOLLOW US">
          <li>
            <div className="section-item container reset-justify justify align gap-half">
              <AiFillFacebook />
              <p className="flex opacity-65">Facebook</p>
            </div>
          </li>
          <div className="section-item container reset-justify justify align gap-half">
            <AiFillInstagram />
            <p className="flex opacity-65">Instagram</p>
          </div>
          <div className="section-item container reset-justify justify align gap-half">
            <AiFillTwitterCircle />
            <p className="flex opacity-65">Twitter</p>
          </div>
        </FooterSection>
      </div>
    </>
  );
}
