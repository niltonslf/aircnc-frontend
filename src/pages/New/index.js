import React, { useState, useMemo } from 'react'
import api from '../../services/api'
import camera from '../../assets/camera.svg'
import './styles.css'

export default function New({ history }) {
  const [company, setCompany] = useState('')
  const [techs, setTechs] = useState('')
  const [price, setPrice] = useState('')
  const [thumbnail, setThumbnail] = useState(null)

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null
  }, [thumbnail])

  async function handleSubmit(e) {
    e.preventDefault()
    const user_id = localStorage.getItem('user')

    const data = new FormData()
    data.append('thumbnail', thumbnail)
    data.append('company', company)
    data.append('techs', techs)
    data.append('price', price)

    await api.post('/spots', data, { headers: { user_id } })
    history.push('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{
          backgroundImage: `url(${preview})`
        }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input
          type="file"
          onChange={event => setThumbnail(event.target.files[0])}
        />
        <img src={camera} alt="Enviar foto do seu spot" />
      </label>

      <label htmlFor="company">EMPRESA</label>
      <input
        type="text"
        id="company"
        value={company}
        placeholder="Sua empresa incrível"
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="company">
        TECNOLOGIAS
        <span> * (Separados por vírgula)</span>
      </label>
      <input
        type="text"
        id="company"
        value={techs}
        placeholder="Quais tecnologias usam?"
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="company">
        VALOR DA DIÁRIA
        <span> * (em branco para GRATUITO)</span>
      </label>
      <input
        type="text"
        id="company"
        value={price}
        placeholder="Valor da diária"
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">
        Enviar
      </button>
    </form>
  )
}
