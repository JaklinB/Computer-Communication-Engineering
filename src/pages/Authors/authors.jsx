import React, { useState } from 'react';
import { authorsData } from '../../config/authorsData';
import './styles.css';

function Authors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showHonoraryEditor, setShowHonoraryEditor] = useState(true);
  const [showEditor, setShowEditor] = useState(true);
  const [showBoard, setShowBoard] = useState(true);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAuthors = authorsData.map((category) => {
    return {
      ...category,
      authors: category.authors.filter((author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    };
  });

  const showHonoraryEditorTable = filteredAuthors[0].authors.length > 0;
  const showEditorTable = filteredAuthors[1].authors.length > 0;
  const showBoardTable = filteredAuthors[2].authors.length > 0;

  return (
    <div>
      <h1>Authors</h1>
      <input type="text" placeholder="Search for an author" onChange={handleSearch} />
      {showHonoraryEditorTable && (
        <div>
          <h2>Honorary Editor-in-Chief</h2>
          <table className="authors-table">
            <thead>
              <tr className="authors-table-header">
                <th>Name</th>
                <th>Nationality</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors[0].authors.map((author) => (
                <tr key={author.name} className="authors-table-row">
                  <td className="authors-table-data">{author.name}</td>
                  <td className="authors-table-data">{author.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showEditorTable && (
        <div>
          <h2>Editor-in-Chief</h2>
          <table className="authors-table">
            <thead>
              <tr className="authors-table-header">
                <th>Name</th>
                <th>Nationality</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors[1].authors.map((author) => (
                <tr key={author.name} className="authors-table-row">
                  <td className="authors-table-data">{author.name}</td>
                  <td className="authors-table-data">{author.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showBoardTable && (
        <div>
          <h2>Editorial and Scientific Board</h2>
          <table className="authors-table">
            <thead>
              <tr className="authors-table-header">
                <th>Name</th>
                <th>Nationality</th>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors[2].authors.map((author) => (
                <tr key={author.name} className="authors-table-row">
                  <td className="authors-table-data">{author.name}</td>
                  <td className="authors-table-data">{author.nationality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Authors;
