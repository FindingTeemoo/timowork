<template>
  <div class="contact">
    <div class="contact-container">
      <div class="contact-header">
        <h1>CONTACT</h1>
        <div class="header-line"></div>
      </div>

      <div class="contact-grid">
        <div class="contact-info">
          <div class="info-block">
            <h2>EMAIL</h2>
            <a href="mailto:contact@example.com">contact@example.com</a>
          </div>

          <div class="info-block">
            <h2>SOCIAL</h2>
            <a href="#" target="_blank">Instagram</a>
            <a href="#" target="_blank">Twitter</a>
            <a href="#" target="_blank">LinkedIn</a>
          </div>

          <div class="info-block">
            <h2>LOCATION</h2>
            <p>New York, NY</p>
            <p>United States</p>
          </div>
        </div>

        <div class="contact-form-section">
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                placeholder="NAME"
              >
            </div>
            
            <div class="form-group">
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                placeholder="EMAIL"
              >
            </div>
            
            <div class="form-group">
              <textarea 
                id="message" 
                v-model="form.message" 
                rows="8" 
                required
                placeholder="MESSAGE"
              ></textarea>
            </div>
            
            <button type="submit" class="submit-btn">
              <span>SEND</span>
              <span class="btn-arrow">→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  message: ''
});

const submitForm = () => {
  console.log('Form submitted:', form);
  alert('Thank you for your message!');
  form.name = '';
  form.email = '';
  form.message = '';
};
</script>

<style scoped>
.contact {
  min-height: 100vh;
  background: #ffffff;
  padding-top: 80px;
  color: #000000;
}

.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 4rem;
}

.contact-header {
  margin-bottom: 6rem;
}

.contact-header h1 {
  font-family: var(--font-heading);
  font-size: 6rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  margin: 0;
  color: #000000;
}

.header-line {
  width: 100%;
  height: 1px;
  background: #000000;
  margin-top: 2rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 6rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.info-block h2 {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
  color: #000000;
}

.info-block a,
.info-block p {
  display: block;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #000000;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 300;
}

.info-block a:hover {
  padding-left: 10px;
  opacity: 0.6;
}

.info-block p {
  margin: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  position: relative;
}

input,
textarea {
  width: 100%;
  padding: 1.5rem 0;
  border: none;
  border-bottom: 1px solid #000000;
  font-size: 1rem;
  background: transparent;
  color: #000000;
  font-family: inherit;
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
}

input::placeholder,
textarea::placeholder {
  color: #000000;
  opacity: 0.4;
  font-weight: 300;
  letter-spacing: 0.1em;
}

input:focus,
textarea:focus {
  outline: none;
  border-bottom-width: 2px;
}

textarea {
  resize: vertical;
  min-height: 150px;
}

.submit-btn {
  background: #000000;
  color: #ffffff;
  border: none;
  padding: 1.5rem 3rem;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  transition: all 0.3s ease;
  align-self: flex-start;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #ffffff;
  transition: left 0.3s ease;
}

.submit-btn:hover::before {
  left: 0;
}

.submit-btn span {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.submit-btn:hover span {
  color: #000000;
}

.btn-arrow {
  transition: transform 0.3s ease;
}

.submit-btn:hover .btn-arrow {
  transform: translateX(5px);
}

@media (max-width: 1024px) {
  .contact-container {
    padding: 4rem 2rem;
  }

  .contact-header h1 {
    font-size: 4rem;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .contact-container {
    padding: 3rem 1.5rem;
  }

  .contact-header {
    margin-bottom: 4rem;
  }

  .contact-header h1 {
    font-size: 3rem;
  }

  .contact-info {
    gap: 3rem;
  }

  .info-block h2 {
    font-size: 0.8rem;
  }

  .submit-btn {
    width: 100%;
  }
}

</style>