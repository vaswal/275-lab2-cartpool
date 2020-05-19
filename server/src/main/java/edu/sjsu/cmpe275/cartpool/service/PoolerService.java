package edu.sjsu.cmpe275.cartpool.service;

import edu.sjsu.cmpe275.cartpool.pojos.Pooler;

public interface PoolerService {
    Pooler findById(Long id);

    Iterable<Pooler> findAll();

    Pooler login(String email, String password);

    Pooler save(Pooler pooler);

    Pooler verify(String email);

    Pooler loginOAuth(String email, String provider_id);

    void addContribution(String email, int contributionCount);

    void subtractContribution(String email);

    int getContribution(long id);

    boolean findByNickName(String nickName, Long id);
}
