import React from 'react';

function Directory({data}) {
  return (
    <div className="px-10">
    {data.map((section, index) => (
      <div key={index}>
        <h2 className='indent-10 text-base font-display'>
            <b>{section.title}</b>
        </h2>
        <ul className="my-2 flex flex-wrap">
          {section.links.map((link, linkIndex) => (
            <li key={linkIndex} className="w-1/3 indent-16 my-1 font-mono">
                <p>{index+1}.{linkIndex+1}: <a className='text-blue-500 hover:text-red-500 ' href={link.href}>{link.title}</a></p>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
  );
}

export default Directory;
