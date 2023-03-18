import React from 'react'

export default function Footer() {
  return (<div className="Bg inline-flex flex-col space-y-5 items-start justify-end pt-24 pb-6 bg-green-900 w-full">
  <div className="FooterContent relative" >
      <div className="Border left-0 bottom-0 bg-gray-700"/>
      <div className="FooterText inline-flex flex-col space-y-1 items-start justify-start w-96 h-40">
          <img className="ph:boat-fill w-6 h-6 rounded-lg" src="https://via.placeholder.com/24x25"/>
          <p className="BoatBouncer w-48 text-xl font-bold text-white uppercase">Boat Bouncer</p>
          <p className="Yetbed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. opacity-40 w-full text-base font-medium leading-relaxed text-white">Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment.</p>
      </div>
      <div className="NavWrap inline-flex space-x-14 items-start justify-start">
          <div className="NavList Item inline-flex flex-col space-y-9 items-start justify-end w-24 h-full">
              <p className="Company w-full text-xl font-bold leading-normal text-white">Company</p>
              <div className="Frame116 flex flex-col space-y-4 items-start justify-start">
                  <p className="AboutUs text-base font-medium leading-normal text-white">About Us</p>
                  <p className="Careers text-base font-medium leading-normal text-white">Careers</p>
                  <p className="Blog text-base font-medium leading-normal text-white">Blog</p>
                  <p className="Pricing text-base font-medium leading-normal text-white">Pricing</p>
              </div>
          </div>
          <div className="NavList Item inline-flex flex-col space-y-9 items-center justify-end w-40 h-48">
              <p className="Product w-20 text-xl font-bold leading-normal text-white">Product</p>
              <div className="Frame116 flex flex-col space-y-3 items-start justify-start">
                  <p className="InvoicingPlatform text-base font-medium leading-normal text-white">Invoicing Platform</p>
                  <p className="AccountingPlateform text-base font-medium leading-normal text-white">Accounting Plateform</p>
                  <p className="CreateProposal text-base font-medium leading-normal text-white">Create Proposal</p>
                  <p className="Contracts text-base font-medium leading-normal text-white">Contracts</p>
              </div>
          </div>
          <div className="NavList Item inline-flex flex-col space-y-9 items-center justify-end w-44 h-48">
              <p className="Resources w-2/3 text-xl font-bold leading-normal text-white">Resources</p>
              <div className="Frame116 flex flex-col space-y-3 items-start justify-start">
                  <p className="ProposalTemplate text-base font-medium leading-normal text-white">Proposal Template</p>
                  <p className="InvoiceTemplate text-base font-medium leading-normal text-white">Invoice Template</p>
                  <p className="Tuturoial text-base font-medium leading-normal text-white">Tuturoial</p>
                  <p className="Howto write a contract text-base font-medium leading-normal text-white">How to write a contract</p>
              </div>
          </div>
      </div>
  </div>
  <div className="CopyrightsText inline-flex space-x-96 items-center justify-end" style={{width: 1213.62, height: 26,}}>
      <p className="2022BoatBouncer. All rights reserved. -- Privacy Policy - Terms of Services text-xs font-extralight leading-relaxed text-white" style={{width: 390.70,}}>2022 BoatBouncer. All rights reserved. -- Privacy Policy - Terms of Services</p>
      <p className="Supportedby Startup w-48 text-xs leading-relaxed text-right text-white">Supported by  Startup</p>
  </div>
</div>
  )
}