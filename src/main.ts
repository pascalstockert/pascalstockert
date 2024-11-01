import './style.css';

// Prevent ghost-elements on images
const preventDraggingOnElements = (query: string) => {
  document.querySelectorAll(query)
    .forEach(element => element.setAttribute('draggable', 'false'));
};
preventDraggingOnElements('img');

// Replace scrollbars with custom behavior
class Scrollbar {
  container: HTMLElement;
  scrollTrack: HTMLDivElement;
  scrollbar: HTMLDivElement;
  opacityTimer = window.setTimeout(() => {});

  constructor(container: HTMLElement) {
    container.style.position = 'relative';
    container.style.scrollbarWidth = 'none';

    const scrollTrack = document.createElement('div');
    const scrollbar = document.createElement('div');
    const isLight = container.attributes.getNamedItem('scrollable')!.value === 'light'

    if (container.offsetHeight < container.scrollHeight) {
      scrollTrack.style.position = 'absolute';
      scrollTrack.style.width = '8px';
      scrollTrack.style.height = `${container.scrollHeight - 16}px`;
      scrollTrack.style.right = '8px';
      scrollTrack.style.top = '8px';
      container.appendChild(scrollTrack);

      scrollbar.style.position = 'sticky';
      scrollbar.style.width = '8px';
      scrollbar.style.height = container.offsetHeight * (container.offsetHeight / scrollTrack.clientHeight) + 'px';
      scrollbar.style.top = '8px';
      scrollbar.style.borderRadius = '4px';
      scrollbar.style.backgroundColor = isLight ? '#FFFBEF' : '#453B3A';
      scrollbar.style.opacity = '0';
      scrollbar.style.transition = 'opacity .2s';
      scrollbar.style.content = '';
      scrollTrack.appendChild(scrollbar);
    }

    container.addEventListener('scroll', () => this.handleScroll(container, scrollTrack, scrollbar));

    this.container = container;
    this.scrollTrack = scrollTrack;
    this.scrollbar = scrollbar;
  }

  handleScroll(
    container: HTMLElement,
    scrollTrack: HTMLDivElement,
    scrollbar: HTMLDivElement
  ): void {
    const trackLength = scrollTrack.clientHeight;
    const visibleTrackLength = container.offsetHeight - 16;
    const scrollbarHeight = scrollbar.clientHeight;
    scrollbar.style.top = container.scrollTop * ((visibleTrackLength) / (trackLength + scrollbarHeight)) + 8 + 'px';
    scrollbar.style.opacity = '.8';
    this.restartTimer(scrollbar);
  }

  restartTimer(scrollbar: HTMLDivElement): void {
    clearTimeout(this.opacityTimer);
    this.opacityTimer = window.setTimeout((scrollbar: HTMLDivElement) => {
      scrollbar.style.opacity = '0';
    }, 500, scrollbar);
  }
}

const scrollable = Array.from(document.querySelectorAll('[scrollable]')) as HTMLElement[];
scrollable.forEach(container => {
  new Scrollbar(container);
});
