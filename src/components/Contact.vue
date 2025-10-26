<template>
  <div class="contact">
    <div class="contact-header">
      <h1>Get in Touch</h1>
      <p class="subtitle">Let's discuss art, collaborations, or your next piece</p>
    </div>

    <div class="contact-content">
      <div class="contact-info-section">
        <div class="info-card">
          <div class="icon">📍</div>
          <h3>Studio Location</h3>
          <p>Art District, 123 Creative Street</p>
          <p>New York, NY 10001</p>
        </div>

        <div class="info-card">
          <div class="icon">📧</div>
          <h3>Email</h3>
          <p>artist@example.com</p>
          <p>gallery@example.com</p>
        </div>

        <div class="info-card">
          <div class="icon">⌚</div>
          <h3>Studio Hours</h3>
          <p>Tuesday - Saturday</p>
          <p>10:00 AM - 6:00 PM</p>
        </div>

        <div class="social-links">
          <a href="#" class="social-link">Instagram</a>
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">LinkedIn</a>
        </div>
      </div>

      <div class="contact-form-section">
        <form @submit.prevent="submitForm" class="contact-form">
          <div class="form-group">
            <label for="name">Name</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required
              placeholder="Your name"
            >
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
              placeholder="your.email@example.com"
            >
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <select 
              id="subject" 
              v-model="form.subject"
              required
            >
              <option value="">Select a subject</option>
              <option value="commission">Commission Work</option>
              <option value="purchase">Purchase Artwork</option>
              <option value="exhibition">Exhibition Inquiry</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="message">Message</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              rows="5" 
              required
              placeholder="Your message here..."
            ></textarea>
          </div>
          
          <button type="submit" class="submit-btn">
            Send Message
            <span class="btn-icon">→</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const submitForm = () => {
  // Here you would typically handle the form submission
  console.log('Form submitted:', form);
  // Reset form
  form.name = '';
  form.email = '';
  form.subject = '';
  form.message = '';
  alert('Thank you for your message! I will get back to you soon.');
};
</script>

<style scoped>
.contact {
  padding-top: 6rem;
}

.contact-header {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--accent-color) 0%, #6c5ce7 100%);
  color: white;
  margin-bottom: 4rem;
}

.contact-header h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-family: var(--font-heading);
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0;
  animation: fadeIn 0.8s ease-out 0.3s forwards;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: var(--card-background);
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform var(--transition-speed) ease;
}

.info-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.info-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-family: var(--font-heading);
}

.info-card p {
  color: #666;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.social-link {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--accent-color);
  border-radius: 25px;
  color: var(--accent-color);
  text-decoration: none;
  transition: all var(--transition-speed) ease;
}

.social-link:hover {
  background: var(--accent-color);
  color: white;
}

.contact-form-section {
  background: var(--card-background);
  padding: 3rem;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
  font-weight: 500;
}

input,
textarea,
select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #eee;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color var(--transition-speed) ease;
  background: white;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--accent-color);
}

.submit-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all var(--transition-speed) ease;
}

.submit-btn:hover {
  background: #d35400;
  transform: translateY(-2px);
}

.btn-icon {
  transition: transform var(--transition-speed) ease;
}

.submit-btn:hover .btn-icon {
  transform: translateX(5px);
}

@media (max-width: 1024px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .contact-info-section {
    order: 2;
  }

  .contact-form-section {
    order: 1;
  }
}

@media (max-width: 768px) {
  .contact-header {
    padding: 3rem 1rem;
  }

  .contact-header h1 {
    font-size: 2.5rem;
  }

  .contact-content {
    padding: 0 1rem;
  }

  .contact-form-section {
    padding: 2rem;
  }

  .social-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>