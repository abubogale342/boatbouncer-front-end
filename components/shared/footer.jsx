import React from "react";

{
  /* <footer className="flex flex-col bg-slate-800 pt-24">
      <div className="flex flex-col text-white md:flex-row">
        <div className="flex flex-col">
          <p></p>
          <p className="font-medium text-white">
            Welcome to BoatBouncer, your premier destination for boat rentals
            and water activities! Whether you are looking to explore the open
            waters, enjoy a day out with friends and family, or simply want to
            relax and take in the scenery, we have the perfect options for you.
            So if you're ready to hit the water and experience and start your
            adventure, come to BoatBouncer. We look forward to providing you
            with a memorable and enjoyable experience that you'll never forget.
          </p>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="flex flex-col justify-between text-white sm:flex-row">
        <p className="text-xs font-extralight">
          2022 BoatBouncer. All rights reserved. -- Privacy Policy - Terms of
          Services
        </p>
        <p>Supported by Startup</p>
      </div>
    </footer> */
}

export default function Footer() {
  return (
    <>
      <footer className="flex flex-col bg-slate-800 pt-24">
        <div className="flex flex-col justify-around text-white md:flex-row">
          <div className="flex w-1/4 flex-col">
            <p className="Company w-full text-xl font-bold leading-normal text-white">
              BOAT BOUNCER
            </p>
            <p className="font-medium text-white">
              Welcome to BoatBouncer, your premier destination for boat rentals
              and water activities! Whether you are looking to explore the open
              waters, enjoy a day out with friends and family, or simply want to
              relax and take in the scenery, we have the perfect options for
              you. So if you're ready to hit the water and experience and start
              your adventure, come to BoatBouncer. We look forward to providing
              you with a memorable and enjoyable experience that you'll never
              forget.
            </p>
          </div>
          <div className="flex flex-col">
            <p className="Company w-full text-xl font-bold leading-normal text-white">
              Company
            </p>
            <div className="Frame116 flex flex-col items-start justify-start space-y-4">
              <p className="AboutUs text-base font-medium leading-normal text-white">
                About Us
              </p>
              <p className="Careers text-base font-medium leading-normal text-white">
                Careers
              </p>
              <p className="Blog text-base font-medium leading-normal text-white">
                Blog
              </p>
              <p className="Pricing text-base font-medium leading-normal text-white">
                Pricing
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="Product w-20 text-xl font-bold leading-normal text-white">
              Product
            </p>
            <div className="Frame116 flex flex-col items-start justify-start space-y-3">
              <p className="InvoicingPlatform text-base font-medium leading-normal text-white">
                Invoicing Platform
              </p>
              <p className="AccountingPlateform text-base font-medium leading-normal text-white">
                Accounting Plateform
              </p>
              <p className="CreateProposal text-base font-medium leading-normal text-white">
                Create Proposal
              </p>
              <p className="Contracts text-base font-medium leading-normal text-white">
                Contracts
              </p>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="Resources w-2/3 text-xl font-bold leading-normal text-white">
              Resources
            </p>
            <div className="Frame116 flex flex-col items-start justify-start space-y-3">
              <p className="ProposalTemplate text-base font-medium leading-normal text-white">
                Proposal Template
              </p>
              <p className="InvoiceTemplate text-base font-medium leading-normal text-white">
                Invoice Template
              </p>
              <p className="Tuturoial text-base font-medium leading-normal text-white">
                Tuturoial
              </p>
              <p className="Howto write a contract text-base font-medium leading-normal text-white">
                How to write a contract
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-around md:flex-row">
          <p
            className="2022BoatBouncer. All rights reserved. -- Privacy Policy - Terms of Services text-xs font-extralight leading-relaxed text-white"
            style={{ width: 390.7 }}
          >
            2022 BoatBouncer. All rights reserved. -- Privacy Policy - Terms of
            Services
          </p>
          <p className="Supportedby Startup w-48 text-right text-xs leading-relaxed text-white">
            Supported by Startup
          </p>
        </div>
      </footer>

      {/* <div className="Bg inline-flex w-full flex-col items-start justify-end space-y-5 bg-green-900 pt-24 pb-6">
        <div className="FooterContent relative">
          <div className="Border left-0 bottom-0 bg-gray-700" />
          <div className="FooterText inline-flex h-40 w-96 flex-col items-start justify-start space-y-1">
            <img
              className="ph:boat-fill h-6 w-6 rounded-lg"
              src="https://via.placeholder.com/24x25"
            />
            <p className="BoatBouncer w-48 text-xl font-bold uppercase text-white">
              Boat Bouncer
            </p>
            <p className="Yetbed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. w-full text-base font-medium leading-relaxed text-white opacity-40">
              Yet bed any for travelling assistance indulgence unpleasing. Not
              thoughts all exercise blessing. Indulgence way everything joy
              alteration boisterous the attachment.
            </p>
          </div>
          <div className="NavWrap inline-flex items-start justify-start space-x-14">
            <div className="NavList Item inline-flex h-full w-24 flex-col items-start justify-end space-y-9">
              <p className="Company w-full text-xl font-bold leading-normal text-white">
                Company
              </p>
              <div className="Frame116 flex flex-col items-start justify-start space-y-4">
                <p className="AboutUs text-base font-medium leading-normal text-white">
                  About Us
                </p>
                <p className="Careers text-base font-medium leading-normal text-white">
                  Careers
                </p>
                <p className="Blog text-base font-medium leading-normal text-white">
                  Blog
                </p>
                <p className="Pricing text-base font-medium leading-normal text-white">
                  Pricing
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="Product w-20 text-xl font-bold leading-normal text-white">
                Product
              </p>
              <div className="Frame116 flex flex-col items-start justify-start space-y-3">
                <p className="InvoicingPlatform text-base font-medium leading-normal text-white">
                  Invoicing Platform
                </p>
                <p className="AccountingPlateform text-base font-medium leading-normal text-white">
                  Accounting Plateform
                </p>
                <p className="CreateProposal text-base font-medium leading-normal text-white">
                  Create Proposal
                </p>
                <p className="Contracts text-base font-medium leading-normal text-white">
                  Contracts
                </p>
              </div>
            </div>
            <div className="NavList Item inline-flex h-48 w-44 flex-col items-center justify-end space-y-9">
              <p className="Resources w-2/3 text-xl font-bold leading-normal text-white">
                Resources
              </p>
              <div className="Frame116 flex flex-col items-start justify-start space-y-3">
                <p className="ProposalTemplate text-base font-medium leading-normal text-white">
                  Proposal Template
                </p>
                <p className="InvoiceTemplate text-base font-medium leading-normal text-white">
                  Invoice Template
                </p>
                <p className="Tuturoial text-base font-medium leading-normal text-white">
                  Tuturoial
                </p>
                <p className="Howto write a contract text-base font-medium leading-normal text-white">
                  How to write a contract
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="CopyrightsText inline-flex items-center justify-end space-x-96"
          style={{ width: 1213.62, height: 26 }}
        >
          <p
            className="2022BoatBouncer. All rights reserved. -- Privacy Policy - Terms of Services text-xs font-extralight leading-relaxed text-white"
            style={{ width: 390.7 }}
          >
            2022 BoatBouncer. All rights reserved. -- Privacy Policy - Terms of
            Services
          </p>
          <p className="Supportedby Startup w-48 text-right text-xs leading-relaxed text-white">
            Supported by Startup
          </p>
        </div>
      </div> */}
    </>
  );
}
