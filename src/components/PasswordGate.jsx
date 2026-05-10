import { useState } from 'react'
import { motion } from 'motion/react'

export default function PasswordGate({ title, subtitle, onSubmit, onCancel }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const accepted = await onSubmit(password)

    if (!accepted) {
      setError('Incorrect password')
      setPassword('')
      return
    }

    setError('')
  }

  return (
    <motion.div
      className='absolute inset-0 z-50 flex items-center justify-center px-6'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-black/55 backdrop-blur-md'
      />
      <motion.form
        onSubmit={handleSubmit}
        className='relative z-10 w-full max-w-md rounded-[28px] border border-white/12 bg-[#0a0b12]/85 p-6 shadow-2xl shadow-black/40'
        initial={{ y: 16, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className='text-[10px] uppercase tracking-[0.34em] text-amber-200/70'>
          {subtitle}
        </p>
        <h2
          className='mt-4 font-serif text-[34px] leading-none text-[#f5edde]'
          style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 400 }}
        >
          {title}
        </h2>
        <p className='mt-4 text-[15px] leading-relaxed text-[#f5edde]/72'>
          Enter the password to open this section.
        </p>
        <label className='mt-5 block'>
          <span className='sr-only'>Password</span>
          <input
            autoFocus
            type='password'
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
              if (error) setError('')
            }}
            className='w-full rounded-full border border-white/14 bg-white/6 px-4 py-3 text-[15px] text-[#f5edde] outline-none transition focus:border-amber-200/50 focus:bg-white/10'
            placeholder='Password'
          />
        </label>
        {error && <p className='mt-3 text-sm text-rose-200'>{error}</p>}
        <div className='mt-6 flex items-center justify-between gap-3'>
          <button
            type='button'
            onClick={onCancel}
            className='rounded-full px-3 py-2 text-sm text-[#f5edde]/70 transition hover:text-[#f5edde]'
          >
            Back
          </button>
          <button
            type='submit'
            className='rounded-full bg-amber-200/15 px-5 py-2.5 text-sm text-[#f5edde] transition hover:bg-amber-200/25'
          >
            Unlock
          </button>
        </div>
      </motion.form>
    </motion.div>
  )
}
