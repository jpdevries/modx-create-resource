document.addEventListener('DOMContentLoaded', (event) => {
  /*try {
    document.getElementById('preview-template').addEventListener('change', (event) => {
      if(event.target.checked) {
        document.body.dataset.templatePreview = 'true';
      } else {
        document.body.dataset.templatePreview = 'false';
      }
    });
  } catch (e) {

  }
  */

  document.querySelector('.template-chooser').addEventListener('change', (event) => {
    document.querySelector('iframe').setAttribute('src', event.target.getAttribute('data-preview'));
  });

  document.getElementById('classkey').addEventListener('change', (event) => {
    console.log(event.target.value);
    const deps = document.querySelectorAll(`[data-dependent*=${event.target.value}]`);
    const allExempts = document.querySelectorAll(`[data-exempt]`);
    const exempts = document.querySelectorAll(`[data-exempt*=${event.target.value}]`);

    console.log('exempts', exempts);

    for(let i = 0; i < allExempts.length; i++) {
      const exempt = allExempts[i];
      exempt.removeAttribute('hidden');
    }
    console.log(deps);
    for(let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      dep.removeAttribute('hidden');
    }


    console.log(exempts);
    for(let i = 0; i < exempts.length; i++) {
      const exempt = exempts[i];
      exempt.setAttribute('hidden', 'true');
    }
  });

  function handlePageTitleChange(event) {
    if(event.target.value) {
      document.getElementById('choose-template').removeAttribute('disabled');
    } else {
      document.getElementById('choose-template').setAttribute('disabled', 'true');
    }
    const deps = document.querySelectorAll('[data-bind="pagetitle"]');
    for(let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      dep.innerHTML = (dep.dataset.prepend || '') + (event.target.value || dep.dataset.default || '');
    }
  }

  document.getElementById('parent-find-by').addEventListener('change', (event) => {
    const dataFindBys = document.querySelectorAll('[data-parent-find-by]');
    for(let i = 0; i < dataFindBys.length; i++) dataFindBys[i].setAttribute('hidden', true);
    document.querySelector(`[data-parent-find-by="${event.target.value}"]`).removeAttribute('hidden');
  });

  function handleParentChange(event) {
    console.log(event.target.value);

    const listAttr = event.target.getAttribute('list');
    if(listAttr) {
      const list = document.getElementById(listAttr);
      if(list) {
        const options = list.querySelectorAll('option');
        const validOption = (() => {
          for(let i = 0; i < options.length; i++) {
            const option = options[i];
            if(option.getAttribute('value') === event.target.value) {
              return option;
            }
          }
          return false;
        })();
        if(validOption) {
          console.log(validOption, validOption.dataset.parent);
          document.getElementById('parent').value = validOption.dataset.parent;
        }

      }
    }
  }

  document.getElementById('parent-input').addEventListener('change', handleParentChange);
  document.getElementById('parent-input').addEventListener('input', handleParentChange);

  document.getElementById('parent').addEventListener('change', (event) => {
    document.getElementById('parent-input').value = document.getElementById('parent-list').querySelector(`[data-parent="${event.target.value}"]`).getAttribute('value');
  });

  document.getElementById('pagetitle').addEventListener('change', handlePageTitleChange);
  document.getElementById('pagetitle').addEventListener('input', handlePageTitleChange);

  document.getElementById('template-select').addEventListener('change', (event) => {
    console.log(event.target.value);
    const input = document.getElementById('template-chooser').querySelector(`[data-template="${event.target.value}"]`);
    input.checked = true;
    document.querySelector('iframe').setAttribute('src', input.getAttribute('data-preview'));
  });

  document.getElementById('fullscreen-preview').addEventListener('change', (event) => {
    if(event.target.checked) {
      launchIntoFullscreen(document.getElementById('stage'));
       setTimeout(() => {
         document.getElementById('template-select').focus();
       }, 120);
    }
    else exitFullscreen();
  });

  function handleFullScreenChange(event) {
    const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement,
    isFullscreen = fullscreenElement ? true : false;

    document.getElementById('fullscreen-preview').checked = isFullscreen;

    if(isFullscreen) {

    } else {

    }
  }

  ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange'].forEach((handler) => (
    document.addEventListener(handler, handleFullScreenChange)
  ));

  function launchIntoFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }

})
