import { Organization } from '@/utils/interfaces';
import React from 'react';
import { FaBuilding, FaGlobe, FaLink, FaEnvelope, FaCalendar } from 'react-icons/fa';

function isArrayOfStrings(value:any) {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}
const OrganizationCard: React.FC<{ organization: Organization }> = ({ organization }) => {
  const { name, description, organization_type, industry, headquarters_location, links_social_media, contact_info, date_added, ownership_structure,geographical_scope } = organization.fields;

  return (
    <div className="w-sm rounded-lg  shadow-lg bg-white p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-2 text-gray-800 flex items-center">
        <FaBuilding className="mr-2 text-blue-500" /> {name}
      </h2>

      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}

      <div className="mb-4">
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Type:</span> {organization_type}
        </p>
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Ownership Structure:</span> {ownership_structure.map((el, index)=>(
            <span key={index+1} className='mr-1'>{el}{index !== 0 && index !== ownership_structure.length-1 && ' , '}</span>
          ))}
        </p>
        {
          geographical_scope && (
          <p className="text-gray-700 text-sm">
            <span className="font-semibold">Geographical Scope:</span> {geographical_scope}
          </p>
          )

        }
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Industry:</span> {industry}
        </p>
      </div>
      {headquarters_location && !isArrayOfStrings(headquarters_location) && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaGlobe className="mr-2 text-green-500" /> Headquarters
          </h3>
            <p  className="text-gray-700 text-sm">
              {headquarters_location.address}, {headquarters_location.city}, {headquarters_location.country}
            </p>
          
        </div>
      )}

      {links_social_media && !isArrayOfStrings(links_social_media)  && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaLink className="mr-2 text-purple-500" /> Website And Socials
          </h3>
          <div className="flex space-x-4">
            {
               Object.entries(links_social_media).filter(([_k, v])=> v!==null).map(([key, value])=>(
                <a
                key={key}
                href={value}
                target="_blank"
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                {key}
              </a>
              )
              )
            }
          </div>
        </div>
      )}

      {contact_info && !isArrayOfStrings(contact_info)&& (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <FaEnvelope className="mr-2 text-red-500" /> Contact
          </h3>
          {Object.entries(contact_info).filter(([_k, v])=> v!==null).map(([key, value]) => (
            <div key={key} className="text-gray-700 text-sm">
              <p>{value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="text-gray-500 text-sm flex items-center">
        <FaCalendar className="mr-2 text-yellow-500" />
        <span>Added on: {new Date(date_added).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default OrganizationCard;