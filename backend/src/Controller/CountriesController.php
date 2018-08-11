<?php
namespace App\Controller;

class CountriesController extends AppController
{
    public function initialize()
    {
        parent::initialize();
        $this->loadComponent('RequestHandler');
    }

    public function index()
    {
        $counties = $this->Countries->find('all');
        $this->set([
            'countries' => $counties,
            '_serialize' => ['countries']
        ]);
    }

    public function view($id)
    {
        $country = $this->Countries->get($id);
        $this->set([
            'country' => $country,
            '_serialize' => ['country']
        ]);
    }

    public function add()
    {
        $country = $this->Countries->newEntity($this->request->getData());
        if ($this->Countries->save($country)) {
            $message = 'Saved';
        } else {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            'country' => $country,
            '_serialize' => ['message', 'country']
        ]);
    }

    public function edit($id)
    {
        $country = $this->Countries->get($id);
        if ($this->request->is(['post', 'put'])) {
            $country = $this->Countries->patchEntity($country, $this->request->getData());
            if ($this->Countries->save($country)) {
                $message = 'Saved';
            } else {
                $message = 'Error';
            }
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }

    public function delete($id)
    {
        $country = $this->Countries->get($id);
        $message = 'Deleted';
        if (!$this->Countries->delete($country)) {
            $message = 'Error';
        }
        $this->set([
            'message' => $message,
            '_serialize' => ['message']
        ]);
    }
}
