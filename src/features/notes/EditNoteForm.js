import { useState, useEffect } from 'react';
import { useUpdateNoteMutation } from './notesApiSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const EditNoteForm = ({ users, note }) => {
  const [editNote, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateNoteMutation();

  const navigate = useNavigate();

  const { id } = useParams();
  const [title, setTitle] = useState(note.title);
  const [validTitle, setValidTitle] = useState(false);
  const [text, setText] = useState(note.text);
  const [validText, setValidText] = useState(false);
  const [completed, setCompleted] = useState(note.completed);
  const [author, setAuthor] = useState(users.find(user => note.author === user.id));

  useEffect(() => {
    setValidTitle(title.length > 0);
  }, [title]);

  useEffect(() => {
    setValidText(text.length > 0);
  }, [text]);

  useEffect(() => {
    if(isSuccess) {
      setTitle('');
      setText('');
      setCompleted(false);
      navigate('/dash/notes');
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = e => setTitle(e.target.value);
  const onTextChanged = e => setText(e.target.value);
  const onCompletedChanged = e => setCompleted(prev => {
    console.log(e.target.checked)
    return e.target.checked
  });
  const onAuthorSelected = e => setAuthor(users.find(user => user.username === e.target.value));

  const canSave = [validTitle, validText, author].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async e => {
    e.preventDefault();
    if (canSave) {
      await editNote({ title, text, completed, author, id});
    }
  }

  const errClass = isError ? 'errmsg' : 'offscreen';
  const validTitleClass = !validTitle ? 'form__input--incomplete' : '';
  const validTextClass = !validText ? 'form__input--incomplete' : '';

  const content = (
    <>
      <p className={ errClass }>{ error?.data?.message }</p>
      <form className='form' onSubmit={ onSaveNoteClicked }>
        <div className='form__title-row'>
          <h2>New Note</h2>
          <div>
          <label className='form__label' htmlFor='completed'>Completed:</label>
          <input
            type='checkbox'
            id='completed'
            name='completed'
            className={`from__select`}
            value='completed'
            defaultChecked={ completed }
            onChange={ onCompletedChanged }
          />
          </div>
          <div className='form__action-buttons'>
            <label className='form__label' htmlFor='authorSelector'>Select author: </label>
            <select
              id='authorSelector'
              title='authorSelect'
              onChange={onAuthorSelected}
              value={author?.username}
            >
              {users.map(user => <option>{ user.username }</option>)}
            </select>
          </div>
          <div className='form__action-buttons'>
            <button 
              className='icon-button'
              title='Save'
              disabled={ !canSave }
            >
              <FontAwesomeIcon icon={ faSave } />
            </button>
          </div>
        </div>
        <label className='form__label' htmlFor='title'>
          Title: <span className='nowrap'>[no empty]</span>
        </label>
        <input
          className={`form__input ${ validTitleClass }`}
          required
          id='title'
          name='title'
          type='text'
          autoComplete='off'
          value={ title }
          onChange={ onTitleChanged }
        />
        <label className='form__label' htmlFor='text'>
          Text: <span className='nowrap'>[no empty]</span>
        </label>
        <textarea
          className={`form__input ${ validTextClass }`}
          id='text'
          name='text'
          type='text'
          autoComplete='off'
          value={ text }
          onChange={ onTextChanged }
        />

      </form>
    </>
  )

  return content;
}

export default EditNoteForm;
